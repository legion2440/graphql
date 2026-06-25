export const PROFILE_QUERY = `
  query Profile {
    user {
      id
      login
      auditRatio
      totalUp
      totalDown
    }
  }
`;

export const XP_TRANSACTIONS_QUERY = `
  query XpTransactions($type: String!) {
    transaction(
      where: { type: { _eq: $type } }
      order_by: { createdAt: asc }
    ) {
      id
      amount
      createdAt
      path
      objectId
      object {
        id
        name
        type
      }
    }
  }
`;

export const XP_TRANSACTIONS_VARIABLES = Object.freeze({
  type: "xp",
});
