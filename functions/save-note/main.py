# add your save-note function here
import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("lotion-30142604")

def lambda_handler (event, context):
    #post request
    #need to check the body of the request
    body = json.loads(event ["body"])
    try:
        table.put_item(Item=body)
        return {
            "statusCode": 201,
            "body": "success"
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