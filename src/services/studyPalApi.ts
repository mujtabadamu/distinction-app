// StudyPal API Service
import urls from 'utils/config';

const BASE_URL = urls.FLEXISAF_AI_URL + '/studypal';

export async function startSession({
  user_id,
  name,
  subject,
  topic,
}: {
  user_id: string;
  name: string;
  subject: string;
  topic: string;
}) {
  const res = await fetch(`${BASE_URL}/session/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, name, subject, topic }),
  });
  if (!res.ok) throw new Error('Failed to start session');
  return res.json();
}

export async function getDefaultUI({
  user_id,
  name,
  subject,
  topic,
}: {
  user_id: string;
  name: string;
  subject: string;
  topic: string;
}) {
  const params = new URLSearchParams({ user_id, name, subject, topic });
  const res = await fetch(`${BASE_URL}/default-ui?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to get default UI');
  return res.json();
}

export async function sendChat({
  user_id,
  name,
  subject,
  topic,
  message,
  action,
  session_id,
}: {
  user_id: string;
  name: string;
  subject: string;
  topic: string;
  message?: string;
  action?: string;
  session_id: string;
}) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id,
      name,
      subject,
      topic,
      message,
      action,
      session_id,
    }),
  });
  if (!res.ok) throw new Error('Failed to send chat');
  return res.json();
}
