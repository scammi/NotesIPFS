
export const getShortAddress = (address: string, prefixLength = 7, suffixLength = 4) => {
  if (address.length < prefixLength + suffixLength) {
    return address; // Return the full address if it's too short
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}
