import * as cdk from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { HttpMethods } from "aws-cdk-lib/aws-s3";
import { CloudFrontToS3 } from "@aws-solutions-constructs/aws-cloudfront-s3";
import { Construct } from "constructs";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "TikiBucket", {
      versioned: true,
      bucketName: "tiki-bucket",
      cors: [
        {
          allowedHeaders: ["*"],
          allowedMethods: [HttpMethods.HEAD, HttpMethods.GET],
          allowedOrigins: ["*"],
        },
      ],
    });

    new CloudFrontToS3(this, "TikiCloudfront", { existingBucketObj: bucket });
  }
}
