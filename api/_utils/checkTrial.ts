const TRIAL_DAYS = 30;

interface TrialCheckResult {
  valid: boolean;
  daysRemaining: number;
  expired: boolean;
}

interface User {
  id: number;
  email: string;
  role: string;
  trial_started_at: string | null;
}

export function checkTrialStatus(user: User): TrialCheckResult {
  // Admin 不受試用期限制
  if (user.role === "admin") {
    return { valid: true, daysRemaining: -1, expired: false };
  }

  // 尚未開始試用（首次登入前）
  if (!user.trial_started_at) {
    return { valid: true, daysRemaining: TRIAL_DAYS, expired: false };
  }

  const trialStart = new Date(user.trial_started_at);
  const now = new Date();
  const diffMs = now.getTime() - trialStart.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, TRIAL_DAYS - diffDays);

  return {
    valid: diffDays < TRIAL_DAYS,
    daysRemaining,
    expired: diffDays >= TRIAL_DAYS,
  };
}

export function getTrialDays(): number {
  return TRIAL_DAYS;
}
