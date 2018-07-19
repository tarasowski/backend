# AppSync RBAC with Cognito

There are currently different possibilites to secure access or restrict access to a specific resources. Currently following methods are very easy to implement in conjunction with AppSync:


1. Implementation of aws directives. Note: You can by default deny access unless a user is in a specific group [Source](https://docs.aws.amazon.com/appsync/latest/devguide/security.html#amazon-cognito-user-pools-authorization)

```graphql
type Query {
   posts:[Post!]!
   @aws_auth(cognito_groups: ["Bloggers", "Readers"])
}

type Mutation {
   addPost(id:ID!, title:String!):Post!
   @aws_auth(cognito_groups: ["Bloggers"])
}
``` 

2. Application validation logic. 


3. User Pool in conjunction with Identity Pool. You need to add a user to a specific Cognito Group, this group needs to have IAM policy that can be granted to the user for a short lived access. Note: Users in a group are automatically assigned the IAM role for the group when AWS credentials are provided by Amazon Cognito Federated Identities using the Choose role from token option. [Source](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-user-groups.html#assigning-iam-roles-to-groups)
