import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiDatePicker,
  EuiDatePickerRange,
} from '@elastic/eui';
// import { FormattedMessage } from '@kbn/i18n/react';
// import { SummaryHeading } from '../summaryHeading';
import moment from 'moment';
// import Cookies from 'js-cookie';
import ReportViewer from 'react-lighthouse-viewer';
import axios from 'axios';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(11, 'd'),
      isLoading: true,
      jsonReportApi: undefined,
      // cookie: Cookies.get('set-cookie'),
      searchTerm: '?lte=1000&gte=3000&',
    };

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/').then((response) => {
      this.setState({ jsonReportApi: JSON.parse(response.data.message) });
      this.setState({ isLoading: false });
    });
    const { httpClient } = this.props;
    httpClient.get('../api/kibana-lighthouse-plugin/elasticApi').then((resp) => {
      this.setState({ resp: resp.data });
      console.log(resp);
    });
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date,
    });
  }
  render() {
    const { isLoading, jsonReportApi } = this.state;
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
    console.log(this.state.startDate.unix() * 1000);
    console.log(this.state.endDate.unix() * 1000);
    // console.log(this.state.cookie);
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>Lighthouse audit report</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContent>
                <EuiDatePickerRange
                  startDateControl={
                    <EuiDatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeStart}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      isInvalid={this.state.startDate > this.state.endDate}
                      aria-label="Start date"
                      showTimeSelect
                    />
                  }
                  endDateControl={
                    <EuiDatePicker
                      selected={this.state.endDate}
                      onChange={this.handleChangeEnd}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      isInvalid={this.state.startDate > this.state.endDate}
                      aria-label="End date"
                      showTimeSelect
                    />
                  }
                />
              </EuiPageContent>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiPageContent>
                <ReportViewer json={jsonReportApi} />
              </EuiPageContent>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
