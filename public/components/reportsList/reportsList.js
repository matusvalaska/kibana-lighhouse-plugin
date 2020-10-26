import React from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { v4 as uuidv4 } from 'uuid';
import ReportViewer from 'react-lighthouse-viewer';
// import axios from 'axios';

export class ReportsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    };
  }
  componentDidMount() {
    this.getReportsData();
  }
  componentDidUpdate(prevProps) {
    const { startDate, endDate } = this.props;
    if (startDate !== prevProps.startDate || endDate !== prevProps.endDate) this.getReportsData();
  }
  // getMockedData = () => {
  //   axios.get('http://localhost:5000/').then((response) => {
  //     console.log(response);
  //     this.setState({ hits: response.data.body.hits.hits });
  //     console.log(this.state.hits);
  //   });
  // };
  getElasticSearchData = () => {
    const { httpClient, startDate, endDate } = this.props;
    httpClient
      .get(
        '../api/kibana-lighthouse-plugin/report' +
          '?gte=' +
          startDate.unix() * 1000 +
          '&lte=' +
          endDate.unix() * 1000
      )
      .then((response) => {
        this.setState({ hits: response.data.hits.hits });
      });
  };
  getReportsData = () => {
    // this.getMockedData();
    this.getElasticSearchData();
  };
  render() {
    const { hits } = this.state;
    return hits.map((hit, index) => (
      <div key={uuidv4()}>
        <EuiAccordion
          id={'accordionLighthouseReport' + index}
          buttonContent={hit._source.dateTime}
          paddingSize="l"
        >
          <ReportViewer id={'lighthouseReport' + index} json={JSON.parse(hit._source.message)} />
        </EuiAccordion>
        <EuiSpacer />
      </div>
    ));
  }
}
