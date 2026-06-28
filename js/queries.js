export const PROFILE_QUERY = `
  query Profile {
    user {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;

export const XP_TRANSACTIONS_QUERY = `
  query XpTransactions($type: String!, $eventId: Int!, $userId: Int!) {
    transaction(
      where: { userId: { _eq: $userId }, type: { _eq: $type }, eventId: { _eq: $eventId } }
      order_by: { createdAt: asc }
    ) {
      id
      amount
      createdAt
      path
      eventId
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
  eventId: 96,
});

export const PROFILE_EVENT_QUERY = `
  query ProfileEvent($userId: Int!, $eventId: Int!, $type: String!) {
    event_user(where: { userId: { _eq: $userId }, eventId: { _eq: $eventId } }) {
      id
      userId
      eventId
      userLogin
      userName
      level
      userAuditRatio
      createdAt
      xp {
        amount
        originEventId
        path
      }
    }

    label_user(where: { userId: { _eq: $userId }, eventId: { _eq: $eventId } }) {
      id
      userId
      eventId
      labelId
      labelName
      createdAt
    }

    allXp: transaction_aggregate(where: { userId: { _eq: $userId }, type: { _eq: $type } }) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }

    eventXp: transaction_aggregate(
      where: { userId: { _eq: $userId }, eventId: { _eq: $eventId }, type: { _eq: $type } }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }

    events: event_user(where: { userId: { _eq: $userId } }, order_by: { createdAt: desc }, limit: 80) {
      id
      eventId
      level
      createdAt
      event {
        id
        path
        createdAt
        startAt
        endAt
        object {
          id
          name
          type
        }
      }
    }
  }
`;

export const PROFILE_PROGRESS_QUERY = `
  query ProfileProgress($userId: Int!, $eventId: Int!) {
    progress(
      where: { userId: { _eq: $userId }, eventId: { _eq: $eventId } }
      order_by: { updatedAt: desc }
      limit: 4000
    ) {
      id
      userId
      eventId
      objectId
      path
      grade
      isDone
      createdAt
      updatedAt
      object {
        id
        name
        type
        attrs
      }
    }

    allDoneProgress: progress(
      where: { userId: { _eq: $userId }, isDone: { _eq: true } }
      order_by: { updatedAt: desc }
      limit: 4000
    ) {
      id
      userId
      eventId
      objectId
      path
      grade
      isDone
      createdAt
      updatedAt
      object {
        id
        name
        type
        attrs
      }
    }
  }
`;

export const PROFILE_GROUPS_QUERY = `
  query ProfileGroups($userId: Int!, $eventId: Int!) {
    group_user(
      where: { userId: { _eq: $userId }, eventId: { _eq: $eventId } }
      order_by: { updatedAt: desc }
      limit: 80
    ) {
      id
      userId
      userLogin
      userLevel
      groupId
      eventId
      path
      accepted
      enrollmentStatus
      createdAt
      updatedAt
      group {
        id
        status
        createdAt
        updatedAt
        captainId
        object {
          id
          name
          type
          attrs
        }
      }
    }

    auditsAsAuditor: audit_aggregate(where: { auditorId: { _eq: $userId } }) {
      aggregate {
        count
      }
    }

    recentAuditsAsAuditor: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { updatedAt: desc }
      limit: 30
    ) {
      id
      auditorId
      groupId
      grade
      closureType
      createdAt
      updatedAt
    }

    record_public_view(where: { userId: { _eq: $userId } }) {
      userId
      startAt
      endAt
    }
  }
`;

export const PROFILE_CURRICULUM_QUERY = `
  query ProfileCurriculum {
    curriculumObjects: object(
      where: {
        _or: [
          { attrs: { _has_key: "baseSkills" } }
          { attrs: { _has_key: "timeline" } }
          { attrs: { _has_key: "ranksDefinitions" } }
          { attrs: { _has_key: "levelsDefinitions" } }
        ]
      }
      order_by: { id: asc }
      limit: 5000
    ) {
      id
      name
      type
      attrs
    }
  }
`;
