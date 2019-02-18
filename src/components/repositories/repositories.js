import React from 'react';
import jsonFetch from 'simple-json-fetch';
import styled from 'styled-components';
import siteConfig from '../../../data/siteConfig';

import Loader from '../loader';

const endpoint = `https://api.github.com/users/${
  siteConfig.githubUsername
}/repos?type=owner`;

class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      status: 'loading',
    };
  }
  async componentDidMount() {
    const repos = await jsonFetch(endpoint);
    if (repos.json && repos.json.length) {
      this.setState({ repos: repos.json, status: 'ready' });
    }
  }
  render() {
    const { status } = this.state;
    let projects =
      status === 'ready' && this.state.repos
        ? this.state.repos
            .map(item => {
              if (
                item.name === 'OrderIn' ||
                item.name === 'WriterApp' ||
                item.name === 'distinctly-different-decor-v2' ||
                item.name === 'amwic'
              ) {
                return item;
              }
            })
            .filter(item => item !== undefined)
        : null;
    return (
      <div className={this.props.className}>
        <h2>Code Samples</h2>
        {status === 'loading' && (
          <div className="repositories__loader">
            <Loader />
          </div>
        )}
        {status === 'ready' && this.state.repos && (
          <React.Fragment>
            <div className="repositories__content">
              {projects.map(repo => (
                <React.Fragment key={repo.name}>
                  <div className="repositories__repo">
                    <a className="repositories__repo-link" href={repo.html_url}>
                      <strong>{repo.name}</strong>
                    </a>
                    <div>{repo.description}</div>
                    <a className="repositories__repo-site" href={repo.homepage}>
                      Visit Deployed Site
                    </a>
                    <div className="repositories__repo-date">
                      Updated: {new Date(repo.updated_at).toUTCString()}
                    </div>
                    <div className="repositories__repo-star">
                      ★ {repo.stargazers_count}
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default styled(Repositories)`
  position: relative;
  .repositories__content {
    margin-bottom: 40px;
  }

  .repositories__repo {
    position: relative;
  }

  .repositories__repo-link {
    text-decoration: none;
    color: #25303b;
  }

  .repositories__repo-site {
    text-decoration: none;
    font-style: italic;
    color: #555;
    font-size: 15px;
  }

  .repositories__repo-date {
    color: #bbb;
    font-size: 10px;
  }

  .repositories__repo-star {
    position: absolute;
    top: 0;
    right: 0;
  }

  .repositories__loader {
    display: flex;
  }

  hr {
    margin-top: 16px;
  }
`;
