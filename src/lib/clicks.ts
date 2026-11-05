import { getDb } from "@/lib/mongodb";

type ClickDoc = {
  _id: string; // 링크 id
  count: number;
  lastClickedAt: Date;
};

async function clicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

export async function incrementClick(linkId: string) {
  const col = await clicksCollection();
  await col.updateOne(
    { _id: linkId },
    { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
    { upsert: true },
  );
}

export async function getClickCounts(): Promise<Record<string, number>> {
  const col = await clicksCollection();
  const docs = await col.find().toArray();
  return Object.fromEntries(docs.map((d) => [d._id, d.count]));
}
