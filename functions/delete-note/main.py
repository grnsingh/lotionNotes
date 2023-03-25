# add your delete-note function here
import boto3
import json

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("lotion-30142604")

def lambda_handler(event, context):
    email = event["queryStringParameters"]["email"]
    id = event["queryStringParameters"]["id"]

    try:
        table.delete_item(Key={
            "email": email,
            "id": id
        })
        return {
            "statusCode": 200,
                "body": "success"
        }
    
    except Exception as exp:
        print(f"exception: {exp}")
        return {
            "statusCode": 500,
                "body": json.dumps({
                    "message":str(exp)
        })
}