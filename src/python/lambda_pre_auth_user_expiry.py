import os
import datetime
import dateutil
from dateutil.relativedelta import relativedelta
import boto3
from boto3.dynamodb.conditions import Key

tableName = os.environ.get("TABLE_NAME")
regionName = os.environ.get("AWS_REGION")

dynamodb = boto3.resource("dynamodb", region_name=regionName)
table = dynamodb.Table(tableName)

def queryUser(username):
    print("Query user: " + username)
    response = table.query(
        KeyConditionExpression=Key("username").eq(username)
    )
    items = response["Items"]
    if items:
        return items[0]
    return None

def createUser(username):
    print("Create user: " + username)
    creationDate = datetime.date.today()
    expirationDate = creationDate + relativedelta(months=3)
    lastLoggedIn = datetime.datetime.now()
    insertUser(username, creationDate, expirationDate, lastLoggedIn)

def insertUser(username, creationDate, expirationDate, lastLoggedIn):
    print("Inserting user: " + username + " " + str(creationDate) + " " + str(expirationDate) + " " + str(lastLoggedIn))
    table.put_item(
        Item={
            "username": username,
            "creationDate": str(creationDate),
            "expirationDate": str(expirationDate),
            "lastLoggedIn": str(lastLoggedIn)
        }
    )

def checkUserExpired(user):
    expirationDate = datetime.date.fromisoformat(user["expirationDate"])
    if datetime.date.today() >= expirationDate:
        return True
    return False

def userIsExpired(username):
    message = "User " + username + " is expired."
    print(message)
    raise Exception(message)

def updateUserLastLoggedIn(user):
    username = user["username"]
    print("Update user last logged in: " + username)
    table.update_item(
        Key={
            "username": username
        },
        UpdateExpression="SET lastLoggedIn = :lastLoggedIn",
        ExpressionAttributeValues={
            ":lastLoggedIn": str(datetime.datetime.now())
        }
    )

def lambda_handler(event, context):
    username = event["userName"]
    user = queryUser(username)
    if user is None:
        createUser(username)
    else:
        if checkUserExpired(user):
            userIsExpired(username)
        else:
            updateUserLastLoggedIn(user)
    return event
