import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import {
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from "aws-cdk-lib/aws-rds";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { SecretValue } from "aws-cdk-lib";

export class DatabaseStack extends cdk.Stack {
  database: DatabaseInstance;

  constructor(scope: Construct, vpc: Vpc, props?: cdk.StackProps) {
    super(scope, "tikipedia-database-stack", props);

    const dbSecurityGroup = new SecurityGroup(
      this,
      "tiki-database-security-group",
      {
        vpc,
        securityGroupName: "tiki-database-sg",
      }
    );
    dbSecurityGroup.connections.allowFromAnyIpv4(Port.tcp(5432));

    this.database = new DatabaseInstance(this, "tiki-database", {
      credentials: {
        username: "tiki_admin",
        password: SecretValue.ssmSecure("DB_ADMIN_PASSWORD", "1"),
      },
      databaseName: "tiki",
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_15,
      }),
      allocatedStorage: 20,
      instanceIdentifier: "tiki-database",
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      securityGroups: [dbSecurityGroup],
      vpc,
      vpcSubnets: { subnetType: SubnetType.PUBLIC, onePerAz: true },
    });
  }
}
