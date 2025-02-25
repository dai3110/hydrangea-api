const keyPrefix = 'custom:'

export const role = {
  admin: {
    read: {
      key: `${keyPrefix}admin`,
      values: [1, 2]
    },
    write: {
      key: `${keyPrefix}admin`,
      values: [2]
    }
  }
} as const
