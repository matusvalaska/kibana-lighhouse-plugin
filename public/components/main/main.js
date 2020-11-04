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
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import { ReportsList } from '../reportsList';
import moment from 'moment';
import IndexSelector from '../indexSelector/indexSelector';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(30, 'minutes'),
      endDate: moment(),
      resultsSize: 10,
      selectedIndex: 'speed*',
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
  getSelectedIndex = (option) => {
    this.setState({ selectedIndex: option });
  };
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
              <EuiFlexGroup>
                <EuiFlexItem grow={false}>
                  <IndexSelector getSelectedIndex={this.getSelectedIndex} />
                </EuiFlexItem>
                <EuiFlexItem grow={false} />
                <EuiFlexItem>
                  <EuiDatePickerRange
                    style={{ maxWidth: '450px' }}
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
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiPageContent>
                <React.Fragment>
                  <ReportsList
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    httpClient={this.props.httpClient}
                    resultsSize={this.state.resultsSize}
                    selectedIndex={this.state.selectedIndex}
                  />
                </React.Fragment>
                <EuiText>
                  <EuiTextColor color="subdued">
                    Maximum {this.state.resultsSize} results
                  </EuiTextColor>
                </EuiText>
              </EuiPageContent>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
