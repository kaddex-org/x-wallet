// Send
export const updateSendDapp = (data) => {
  (window as any)?.chrome?.runtime?.sendMessage({
    data,
    target: 'kda.background',
    action: 'res_sendKadena',
  });
};

// Connect
export const updateConnectMessage = (result, tabId) => {
  (window as any)?.chrome?.runtime?.sendMessage({
    result,
    target: 'kda.background',
    action: 'res_checkStatus',
    tabId,
  });
};

// Sign cmd
export const updateSignedCmdMessage = (result, tabId) => {
  (window as any)?.chrome?.runtime?.sendMessage({
    result,
    target: 'kda.background',
    action: 'res_requestSign',
    tabId,
  });
};
