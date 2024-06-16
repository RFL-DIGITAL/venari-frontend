function getFullName (user: Record<string | number |symbol, any>, type = 'cut') {

  if (type === 'full') {
    return `${user?.lastName} ${user?.firstName}`
  }
  return `${user?.lastName} ${user?.firstName?.slice(0, 1)}.`
}

export { getFullName }
