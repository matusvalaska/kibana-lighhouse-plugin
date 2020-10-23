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
import { ReportsList } from '../reportsList';
import moment from 'moment';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().add(-3, 'd'),
      endDate: moment(),
    };

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  componentDidMount() {}

  handleChangeStart(date) {
    this.setState({
      startDate: date,
      isLoading: true,
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date,
      isLoading: true,
    });
  }
  render() {
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
                      dateFormat="MMM DD, YYYY HH:mm:ss"
                      timeFormat="HH:mm"
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
                      dateFormat="MMM DD, YYYY HH:mm:ss"
                      timeFormat="HH:mm"
                      aria-label="End date"
                      showTimeSelect
                    />
                  }
                />
              </EuiPageContent>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiPageContent>
                <React.Fragment>
                  <ReportsList startDate={this.state.startDate} endDate={this.state.endDate} httpClient={this.props.httpClient}/>
                </React.Fragment>
              </EuiPageContent>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
