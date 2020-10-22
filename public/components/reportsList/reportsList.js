import React from 'react';
import {
  EuiAccordion,
  EuiSpacer,
} from '@elastic/eui';
import { v4 as uuidv4 } from 'uuid';
import ReportViewer from 'react-lighthouse-viewer';
import axios from 'axios';

export class ReportsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hits: [],
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/').then((response) => {
      console.log(response);
      this.setState({ hits: response.data.body.hits.hits });
      console.log(this.state.hits);
      this.setState({ isLoading: false });
    });
    // const { httpClient } = this.props;
    // httpClient
    //   .get(
    //     '../api/kibana-lighthouse-plugin/elasticApi/lighthouse/report' +
    //       '?gte=' +
    //       this.state.startDate.unix() * 1000 +
    //       '&lte=' +
    //       this.state.endDate.unix() * 1000
    //   )
    //   .then((resp) => {
    //     this.setState({ hits: resp.data.body.hits.hits });
    //   });
  }
  render() {
    const { isLoading, hits } = this.state;
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
    return hits.map((hit) => (
      <>
        <EuiAccordion
          key={uuidv4()}
          id={'accordion' + uuidv4()}
          buttonContent={hit._source.dateTime}
          paddingSize="l"
        >
          <ReportViewer id={'lhar' + uuidv4()} json={JSON.parse(hit._source.message)} />
        </EuiAccordion>
        <EuiSpacer />
      </>
    ));
  }
}
