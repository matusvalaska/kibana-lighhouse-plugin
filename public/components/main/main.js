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
  EuiText,
} from '@elastic/eui';
// import { FormattedMessage } from '@kbn/i18n/react';
// import { SummaryHeading } from '../summaryHeading';
import moment from 'moment';
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
    };

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/').then((response) => {
      this.setState({ jsonReportApi: JSON.parse(response.data.message) });
      this.setState({ isLoading: false });
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

  // componentDidMount() {
  //   /*
  //      FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
  //      manage state and update your UI than this.
  //   */
  //   const { httpClient } = this.props;
  //   httpClient.get('../api/kibana-lighthouse-plugin/example').then((resp) => {
  //     this.setState({ time: resp.data.time });
  //   });
  // }
  render() {
    const { isLoading, jsonReportApi } = this.state;
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
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
                {/*<EuiTitle>*/}
                {/*  <h2>Congratulations</h2>*/}
                {/*</EuiTitle>*/}
                {/*<SummaryHeading />*/}
                {/*  <div>*/}
                {/*    <hr className="euiHorizontalRule euiHorizontalRule--full euiHorizontalRule--marginLarge" />*/}
                {/*  </div>*/}
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
