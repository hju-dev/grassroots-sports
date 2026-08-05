function crc16(str: string): number {
  let crc = 0xffff;
  for (const char of str) {
    crc ^= char.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc;
}

function field(id: string, value: string) {
  return `${id}${String(value.length).padStart(2, '0')}${value}`;
}

export function generatePromptPayPayload(phoneNumber: string, amount?: number): string {
  const normalized = '0066' + phoneNumber.replace(/^0/, '').replace(/\D/g, '');
  const merchantInfo = field('00', 'A000000677010111') + field('01', normalized);

  let payload =
    field('00', '01') +
    field('01', '12') +
    field('29', merchantInfo) +
    field('58', 'TH') +
    field('53', '764');

  if (amount !== undefined) {
    payload += field('54', amount.toFixed(2));
  }

  payload += '6304';
  payload += crc16(payload).toString(16).toUpperCase().padStart(4, '0');
  return payload;
}
