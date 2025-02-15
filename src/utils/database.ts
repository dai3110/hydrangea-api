import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const client = DynamoDBDocument.from(new DynamoDB())

export const db = {
  from(table: string) {
    return {
      async get(condition: { [key: string]: string | number }) {
        return (
          await client
            .get({
              TableName: table,
              Key: condition
            })
            .catch((e) => {
              console.log(e)
              return null
            })
        )?.Item
      }
    }
  }
}
