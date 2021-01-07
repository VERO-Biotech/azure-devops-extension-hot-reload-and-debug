import { IObservableArray, IObservableValue } from "azure-devops-ui/Core/Observable";
import { IListItemDetails, IListSelection, List, ListItem } from "azure-devops-ui/List";
import {
  bindSelectionToObservable, MasterDetailsContext
} from "azure-devops-ui/MasterDetailsContext";
import {
  IStatusProps,
  Status,
  Statuses,
  StatusSize
} from "azure-devops-ui/Status";
import { Tooltip } from "azure-devops-ui/TooltipEx";
import * as React from "react";
import Moment from 'react-moment';
import { dateFormat, verificationStatus } from "./Common";
import { getVerificationHistory } from "./VerificationHistory";
import { IVerificationInfo } from "./VerificationInfo";


const mapStatus = (status: string): IStatusProps => {
  switch (status) {
    case verificationStatus.passed:
      return Statuses.Success;
    case verificationStatus.failed:
      return Statuses.Failed;
  }
  // Return blank status if no mapping found
  return Statuses.Queued;
};

const renderInitialRow = (
  index: number,
  item: IVerificationInfo,
  details: IListItemDetails<IVerificationInfo>,
  key?: string
): JSX.Element => {
  return (
    <ListItem
      className="master-example-row"
      key={key || "list-item" + index}
      index={index}
      details={details}
    >
      <div className="master-example-row-content flex-row flex-center h-scroll-hidden">
        <Status
          {...mapStatus(item.status)}
          key={item.status.toLowerCase()}
          size={StatusSize.l}
          className="status-example flex-self-center "
        />
        <div
          className="flex-column text-ellipsis"
          style={{ marginLeft: "10px", padding: "10px 0px" }}
        >
          <Tooltip overflowOnly={true}>
            <div className="primary-text text-ellipsis">
              <strong>{item.status}:</strong> {item.build}
            </div>
          </Tooltip>
          <Tooltip overflowOnly={true}>
            <div className="primary-text text-ellipsis">{item.verifiedBy} - <Moment date={item.dateOfVerification} format={dateFormat} /></div>
          </Tooltip>
        </div>
      </div>
    </ListItem>
  );
};

type InitialMasterPanelProps = {
  initialSelectedMasterItem: IObservableValue<IVerificationInfo>;
  items: IObservableArray<IVerificationInfo>;
  selection: IListSelection;
}

export const InitialMasterPanelContent: React.FunctionComponent<InitialMasterPanelProps> = ({ initialSelectedMasterItem, items, selection}) => {
  const masterDetailsContext = React.useContext(MasterDetailsContext);
  const [initialItemProvider] = React.useState(items);

  React.useEffect(() => {
    bindSelectionToObservable(
      selection,
      initialItemProvider,
      initialSelectedMasterItem
    );
  });

  React.useEffect(() => {
    getVerificationHistory(items, selection);
  }, []);

  return (
    <List
      ariaLabel={"Validation history entries"}
      itemProvider={initialItemProvider}
      selection={selection}
      renderRow={renderInitialRow}
      width="100%"
      onSelect={() =>
        masterDetailsContext.setDetailsPanelVisbility(true)
      }
    />
  );
};
