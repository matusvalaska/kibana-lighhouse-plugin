import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
} from '@elastic/eui';
// import { FormattedMessage } from '@kbn/i18n/react';
import { SummaryHeading } from '../summaryHeading';
import ReportViewer from 'react-lighthouse-viewer';
import jsonReport from '/Users/matusvalaska/Documents/GitHub_Repo/kibana/plugins/kibana-lighhouse-plugin/data/www.csob.sk-20201019T005738.json';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/kibana-lighthouse-plugin/example').then((resp) => {
      this.setState({ time: resp.data.time });
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
            {/*<EuiPageContentHeader>*/}
              {/*<EuiTitle>*/}
              {/*  <h2>Congratulations</h2>*/}
              {/*</EuiTitle>*/}
              {/*<SummaryHeading />*/}
            {/*  <div>*/}
            {/*    <hr className="euiHorizontalRule euiHorizontalRule--full euiHorizontalRule--marginLarge" />*/}
            {/*  </div>*/}
            {/*</EuiPageContentHeader>*/}
            <EuiPageContentBody>
              {/*<EuiText>*/}
              {/*  <h3>You have successfully created your first Kibana Plugin!</h3>*/}
              {/*  <p>The server time (via API call)</p>*/}
              {/*</EuiText>*/}
              <ReportViewer json={jsonReport} />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
