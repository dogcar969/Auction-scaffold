function dataIndex(data: string, index: number): string {
  return data.substring(2 + index * 64, 2 + index * 64 + 64);
}
export { dataIndex };
