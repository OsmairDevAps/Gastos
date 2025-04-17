export function parseDataBrParaDate(dataBr: string): Date {
  const [dia, mes, ano] = dataBr.split('/');
  if (!dia || !mes || !ano) return new Date();
  return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

export function formatarDataParaBr(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}