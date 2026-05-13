
export const rotationLogic = {
  onServiceComplete: (staff, isRequested) => {
    if (isRequested) return "Return to original index";
    return "Move to end of queue";
  },
  checkRoomAlert: (timeLeft) => {
    if (timeLeft <= 0) return "TIMEOUT";
    if (timeLeft <= 10) return "URGENT_ALERT";
    return "NORMAL";
  }
};
