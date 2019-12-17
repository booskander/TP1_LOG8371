/*
 * SonarQube
 * Copyright (C) 2009-2020 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import DeferredSpinner from 'sonar-ui-common/components/ui/DeferredSpinner';
import { translate, translateWithParameters } from 'sonar-ui-common/helpers/l10n';
import { withCurrentUser } from '../../../components/hoc/withCurrentUser';
import { isLoggedIn } from '../../../helpers/users';
import { BranchLike } from '../../../types/branch-like';
import { DetailedHotspot, HotspotUpdateFields } from '../../../types/security-hotspots';
import HotspotActions from './HotspotActions';
import HotspotSnippetContainer from './HotspotSnippetContainer';
import HotspotViewerTabs from './HotspotViewerTabs';

export interface HotspotViewerRendererProps {
  branchLike?: BranchLike;
  currentUser: T.CurrentUser;
  hotspot?: DetailedHotspot;
  loading: boolean;
  onUpdateHotspot: (hotspot: HotspotUpdateFields) => void;
  securityCategories: T.StandardSecurityCategories;
}

export function HotspotViewerRenderer(props: HotspotViewerRendererProps) {
  const { branchLike, currentUser, hotspot, loading, securityCategories } = props;

  return (
    <DeferredSpinner loading={loading}>
      {hotspot && (
        <div className="big-padded">
          <div className="big-spacer-bottom">
            <div className="display-flex-space-between">
              <h1>{hotspot.message}</h1>
              {isLoggedIn(currentUser) && (
                <HotspotActions hotspotKey={hotspot.key} onSubmit={props.onUpdateHotspot} />
              )}
            </div>
            <div className="text-muted">
              <span>{translate('hotspot.category')}</span>
              <span className="little-spacer-left">
                {securityCategories[hotspot.rule.securityCategory].title}
              </span>
            </div>
          </div>
          <div className="huge-spacer-bottom">
            <span>{translate('hotspot.status')}</span>
            <span className="badge little-spacer-left">
              {translate('issue.status', hotspot.status)}
            </span>
            {hotspot.assignee && hotspot.assignee.name && (
              <>
                <span className="huge-spacer-left">{translate('hotspot.assigned_to')}</span>
                <strong className="little-spacer-left">
                  {hotspot.assignee.active
                    ? hotspot.assignee.name
                    : translateWithParameters('user.x_deleted', hotspot.assignee.name)}
                </strong>
              </>
            )}
          </div>
          <HotspotSnippetContainer branchLike={branchLike} hotspot={hotspot} />
          <HotspotViewerTabs hotspot={hotspot} />
        </div>
      )}
    </DeferredSpinner>
  );
}

export default withCurrentUser(HotspotViewerRenderer);
