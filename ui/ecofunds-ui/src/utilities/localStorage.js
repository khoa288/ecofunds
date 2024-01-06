export const saveWalletAddress = (address) => {
  localStorage.setItem('wallet-address', address);
};

export const getWalletAddress = () => {
  return localStorage.getItem('wallet-address');
};

export const removeWalletAddress = () => {
  localStorage.removeItem('wallet-address');
};
