const db = require("../dataBase/data");
const {
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  ScanCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");

const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
// get post
const getPost = async (event) => {
  const response = { statusCode: 200 };
  try {
    const params = {
      TableName: process.env.DYNAMIC_TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId }),
    };
    const { Item } = await db.send(new GetItemCommand(params));
    console.log({ Item });
    response.body = JSON.stringify({
      message: "get post success",
      data: Item ? unmarshall(Item) : {},
      rawData: Item,
    });
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "get post failed",
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }
  return response;
};
// create post
const createPost = async (event) => {
  const response = { statusCode: 200 };
  try {
    const body = JSON.parse(event.body);
    const params = {
      TableName: process.env.DYNAMIC_TABLE_NAME,
      Item: marshall(body || {}),
    };
    const createResult = await db.send(new PutItemCommand(params));
    console.log({ createResult });
    response.body = JSON.stringify({
      message: "create post success",
      createResult,
    });
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "create post failed",
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }
  return response;
};

// update post
const updatePost = async (event) => {
    const response = { statusCode: 200 };
    try {
      const body = JSON.parse(event.body);
      const objKey = Object.keys(body)
      const params = {
        TableName: process.env.DYNAMIC_TABLE_NAME,
        Key: marshall({ postId: event.pathParameters.postId }),
      };
      const createResult = await db.send(new PutItemCommand(params));
      console.log({ createResult });
      response.body = JSON.stringify({
        message: "create post success",
        createResult,
      });
    } catch (error) {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "create post failed",
        errorMessage: error.message,
        errorStack: error.stack,
      });
    }
    return response;
  };

  export { getPost, createPost, updatePost };