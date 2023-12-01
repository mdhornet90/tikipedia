import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc, SubnetType } from "aws-cdk-lib/aws-ec2";

export class NetworkingStack extends cdk.Stack {
  vpc: Vpc;
  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, "tikipedia-networking-stack", props);

    this.vpc = new Vpc(this, "tiki-vpc", {
      subnetConfiguration: [
        { name: "public", subnetType: SubnetType.PUBLIC },
        { name: "private", subnetType: SubnetType.PRIVATE_ISOLATED },
      ],
    });
  }
}
