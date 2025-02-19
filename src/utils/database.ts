import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { PrismaClient } from '@prisma/client'

const dynamoClient = DynamoDBDocument.from(new DynamoDB())

export const dynamodb = {
  from(table: string) {
    return {
      async get(condition: { [key: string]: string | number }) {
        return (
          await dynamoClient
            .get({
              TableName: table,
              Key: condition
            })
            .catch((e) => {
              console.log(e)
              return null
            })
        )?.Item
      },
      async put(item: { [key: string]: string | number }) {
        return await dynamoClient
          .put({
            TableName: table,
            Item: item
          })
          .catch((e) => {
            console.log(e)
            return null
          })
      },
      async select() {
        return (
          await dynamoClient
            .scan({
              TableName: table
            })
            .catch((e) => {
              console.log(e)
              return null
            })
        )?.Items
      }
    }
  }
}

export const prisma = new PrismaClient()
