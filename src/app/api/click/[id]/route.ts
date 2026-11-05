import { incrementClick } from "@/lib/clicks";
import { profile } from "@/data/profile";

const validIds = new Set(profile.links.map((link) => link.id));

// 링크 카드 클릭 시 호출되어 해당 링크의 클릭 수를 1 올립니다.
export async function POST(_request: Request, ctx: RouteContext<"/api/click/[id]">) {
  const { id } = await ctx.params;

  if (!validIds.has(id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    await incrementClick(id);
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("[click] 클릭 수 기록 실패:", err);
    return Response.json({ error: "클릭 수를 기록하지 못했습니다." }, { status: 500 });
  }
}
