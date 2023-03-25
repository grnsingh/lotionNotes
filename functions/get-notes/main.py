# add your get-notes function here
import json
from boto3.dynamodb.conditions import Key
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("lotion-30142604")

def lambda_handler (event, context):
    email = event["queryStringParameters"]["email"]
    
    try:
        res = table.query(KeyConditionExpression=Key("email").eq(email))
        return {
            "statusCode": 200,
            "body": json.dumps(res["Items"])
        }
    
    
    except Exception as exp:
        print (exp)
        return {
            "statusCode": 500,
            "body": json. dumps(
            {
                "message":str(exp)
            }
        )
    
    }