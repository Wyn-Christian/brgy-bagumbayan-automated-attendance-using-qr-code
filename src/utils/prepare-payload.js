import dayjs from 'dayjs';

export function prepareUserPayload(data) {
  const payload = { ...data };

  if (dayjs(payload.birthday).isValid()) {
    payload.birthday = dayjs(payload.birthday).format('YYYY-MM-DD');
  }

  if (!payload.password) {
    delete payload.password;
  }

  if ('confirm_password' in payload) {
    delete payload.confirm_password;
  }

  return payload;
}
