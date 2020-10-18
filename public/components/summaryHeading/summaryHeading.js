import React from 'react';
import {
  // EuiPage,
  // EuiPageHeader,
  // EuiTitle,
  // EuiPageBody,
  EuiPageContent,
  // EuiPageContentHeader,
  // EuiPageContentBody,
  // EuiText,
} from '@elastic/eui';
// import { FormattedMessage } from '@kbn/i18n/react';

export class SummaryHeading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTodosStyle = () => {
    return {
      background: '#62bc62',
      padding: '10px',
    };
  };

  // componentDidMount() {
  //   /*
  //      FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
  //      manage state and update your UI than this.
  //   */
  //   const { httpClient } = this.props;
  //   httpClient.get('../api/lighthouse-plugin/example').then(resp => {
  //     this.setState({ time: resp.data.time });
  //   });
  // }
  render() {
    return (
      <EuiPageContent>
        <div className="Todos">
          <div className="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--directionRow euiFlexGroup--responsive">
            <div className="euiFlexItem">Performance</div>
            <div className="euiFlexItem">Accessibility</div>
            <div className="euiFlexItem">Best practices</div>
            <div className="euiFlexItem">SEO</div>
            <div className="euiFlexItem">Progressive Web App</div>
          </div>
        </div>
      </EuiPageContent>
    );
  }
}
