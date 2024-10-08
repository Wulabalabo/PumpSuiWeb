import { CommentType, ObjectsResponseType } from "@/type";
import { bcs } from "@mysten/sui/bcs";
import { DynamicFieldInfo, SuiClient } from "@mysten/sui/client";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { Transaction } from "@mysten/sui/transactions";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { getAllCommentsQL } from "./graphqlContext";

const add_comment = (
  project_record: string,
  reply: string,
  media_link: string,
  content: string
) => {
  if (!isValidSuiObjectId(project_record)) {
    throw new Error("Invalid project record id");
  }
  const tx = new Transaction();
  const reply_to = isValidSuiObjectId(reply)
    ? tx.pure(bcs.option(bcs.Address).serialize(reply).toBytes())
    : tx.pure(bcs.option(bcs.Address).serialize(null).toBytes());
  tx.moveCall({
    package: process.env.NEXT_PUBLIC_PACKAGE!,
    module: "suifund",
    function: "add_comment",
    arguments: [
      tx.object(project_record),
      reply_to,
      tx.pure(bcs.string().serialize(media_link).toBytes()),
      tx.pure(bcs.string().serialize(content).toBytes()),
      tx.object("0x6"),
    ],
  });
  return tx;
};

const like_comment = (project_record: string, idx: number) => {
  if (!isValidSuiObjectId(project_record)) {
    throw new Error("Invalid project record id");
  }
  const tx = new Transaction();
  tx.moveCall({
    package: process.env.NEXT_PUBLIC_PACKAGE!,
    module: "suifund",
    function: "like_comment",
    arguments: [
      tx.object(project_record),
      tx.pure(bcs.u64().serialize(idx).toBytes()),
    ],
  });
  return tx;
};

const unlike_comment = (project_record: string, idx: number) => {
  if (!isValidSuiObjectId(project_record)) {
    throw new Error("Invalid project record id");
  }
  const tx = new Transaction();
  tx.moveCall({
    package: process.env.NEXT_PUBLIC_PACKAGE!,
    module: "suifund",
    function: "unlike_comment",
    arguments: [
      tx.object(project_record),
      tx.pure(bcs.u64().serialize(idx).toBytes()),
    ],
  });
  return tx;
};

const getAllComments = async (
  client: SuiClient,
  address: string,
  cursor: string | undefined
): Promise<ObjectsResponseType<CommentType>> => {
  const { hasNextPage, data, nextCursor } = await client.getDynamicFields({
    parentId: address,
    cursor,
  });
  const responses = await Promise.all(
    data.map(async (record: DynamicFieldInfo) => {
      const result = (await client.getObject({
        id: record.objectId,
        options: { showContent: true },
      })) as unknown as any;
      const returnData: CommentType = {
        index: result.data.content.fields.name,
        id: result.data.content.fields.id.id,
        creator: result.data.content.fields.value.fields.creator,
        media_link: result.data.content.fields.value.fields.media_link,
        content: result.data.content.fields.value.fields.content,
        timestamp: result.data.content.fields.value.fields.timestamp,
        likes: result.data.content.fields.value.fields.likes.fields.contents,
        reply: result.data.content.fields.value.fields.reply,
      };
      return returnData;
    })
  );
  return {
    hasNextPage,
    nextCursor,
    data: responses,
  };
};

const getAllCommentsGraphql = async (
  client: SuiGraphQLClient<{}>,
  address: string,
  nextCursor?: string
): Promise<ObjectsResponseType<CommentType>> => {
  const response = await client.query({
    query: getAllCommentsQL,
    variables: {
      id: address,
      nextCursor: nextCursor,
    },
  });
  if (!response.data?.owner) {
    return {
      hasNextPage: false,
      nextCursor: undefined,
      data: [],
    };
  }
  console.log("response", response);
  const result: CommentType[] = response.data!.owner!.dynamicFields.nodes.map(
    (node: any) => {
      return {
        index: node.name.json,
        creator: node.value.json.creator,
        timestamp: node.value.json.timestamp,
        content: node.value.json.content,
        media_link: node.value.json.media_link,
        likes: node.value.json.likes.contents,
        id: node.value.json.id,
        reply: node.value.json.reply,
        bcs: node.value.bcs,
      };
    }
  );

  return {
    hasNextPage: response.data.owner.dynamicFields.pageInfo.hasNextPage,
    nextCursor: response.data.owner.dynamicFields.pageInfo.endCursor,
    data: result,
  };
};

export {
  getAllComments,
  add_comment,
  like_comment,
  unlike_comment,
  getAllCommentsGraphql,
};
