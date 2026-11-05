import { MongoClient } from "mongodb";

// 개발 모드의 핫 리로드 때마다 새 연결이 쌓이지 않도록 전역에 클라이언트를 보관합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결에 실패하면 다음 요청에서 다시 시도할 수 있도록 캐시를 비웁니다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB ?? "linknamu");
}
