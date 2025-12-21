export default function buildQueryStrings(
  params: Record<string, any>,
  excludeKeys: string[] = [],
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && !excludeKeys.includes(key)) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
