import {
  IWorkItemFormService,
  WorkItemTrackingServiceIds,
} from "azure-devops-extension-api/WorkItemTracking";
import * as SDK from "azure-devops-extension-sdk";
import { IStatusProps, Statuses } from "azure-devops-ui/Status";
import {
  CommonServiceIds,
  IProjectPageService,
} from "azure-devops-extension-api";

export const getWorkItemService = async () => {
  return await SDK.getService<IWorkItemFormService>(
    WorkItemTrackingServiceIds.WorkItemFormService
  );
};

export const getProjectService = async () => {
  return await SDK.getService<IProjectPageService>(
    CommonServiceIds.ProjectPageService
  );
};

export interface IFieldNames {
  verificationHistory: string;
  verifiedBy: string;
  status: string;
  dateOfVerification: string;
  details: string;
  parent: string;
  revision: string;
  workItemType: string;
  integrationBuild: string;
  areaPath: string;
  id: string;
  createdDate: string;
  changedDate: string;
}

export const fieldNames: IFieldNames = {
  verificationHistory: "",
  verifiedBy: "",
  status: "",
  dateOfVerification: "",
  details: "",
  parent: "System.Parent",
  revision: "System.Rev",
  workItemType: "System.WorkItemType",
  integrationBuild: "Microsoft.VSTS.Build.IntegrationBuild",
  areaPath: "System.AreaPath",
  id: "System.Id",
  createdDate: "System.CreatedDate",
  changedDate: "System.ChangedDate",
};

export interface IWorkItemTypes {
  task: string;
}

export const workItemTypes: IWorkItemTypes = {
  task: "Task",
};

export interface IVerificationStatus {
  passed: string;
  failed: string;
}

export const verificationStatus: IVerificationStatus = {
  passed: "Passed",
  failed: "Failed",
};

export const mapStatus = (status: string): IStatusProps => {
  switch (status) {
    case verificationStatus.passed:
      return Statuses.Success;
    case verificationStatus.failed:
      return Statuses.Failed;
  }
  // Return blank status if no mapping found
  return Statuses.Queued;
};

export const dateFormat: string = "MMM DD YYYY, h:mm:ss A";

export const compareDates = (d1: Date, d2: Date): number => {
  // Check if the dates are equal
  if (d1.getTime() === d2.getTime()) return 0;

  // Check if the first is greater than second
  if (d1 > d2) {
    return 1;
  } else {
    // if the first is less than second
    return -1;
  }
};

export interface IIndexable {
  [key: string]: any;
}
