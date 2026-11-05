import { getClickCounts } from "@/lib/clicks";
import { profile } from "@/data/profile";

// 링크별 클릭 수를 조회합니다. (요청 시점마다 DB에서 읽음)
export async function GET() {
  try {
    const counts = await getClickCounts();
    const result = profile.links.map((link) => ({
      id: link.id,
      title: link.title,
      count: counts[link.id] ?? 0,
    }));
    return Response.json(result);
  } catch (err) {
    console.error("[clicks] 클릭 수 조회 실패:", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
