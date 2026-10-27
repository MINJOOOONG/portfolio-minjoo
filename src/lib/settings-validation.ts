import { isRecord, RequestError } from "./request-validation";
import { normalizeProjectCatalog } from "./project-catalog";

function strings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}
export function validateSettings(body: unknown): Record<string, string> {
  if (!isRecord(body)) throw new RequestError("설정 형식이 올바르지 않습니다.");
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (!/^[a-z][a-z0-9_]*$/.test(key) || typeof value !== "string") throw new RequestError("설정 키와 값을 확인해주세요.");
    if (["project_data", "skills_data", "experience_data", "education_data", "certifications_data"].includes(key)) {
      let parsed: unknown;
      try { parsed = JSON.parse(value); } catch { throw new RequestError(`${key}: JSON 형식이 올바르지 않습니다.`); }
      if (key === "project_data") {
        result[key] = JSON.stringify(normalizeProjectCatalog(parsed));
        continue;
      }
      if (key === "skills_data") {
        if (!isRecord(parsed) || !Object.values(parsed).every(strings)) throw new RequestError("기술 스택은 카테고리별 문자열 배열이어야 합니다.");
      } else {
        const required = key === "experience_data" ? ["company", "role", "period", "summary"] :
          key === "education_data" ? ["school", "major", "period"] : ["name", "date"];
        if (!Array.isArray(parsed) || !parsed.every(item => isRecord(item) &&
          required.every(field => typeof item[field] === "string") &&
          ["achievements", "achievementsEn", "techStack"].every(field => item[field] === undefined || strings(item[field])))) {
          throw new RequestError(`${key}: 항목의 필수 필드와 형식을 확인해주세요.`);
        }
      }
    }
    result[key] = value;
  }
  return result;
}
