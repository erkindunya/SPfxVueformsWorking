import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'AutomationFormsSoftwareInstallsWebPartStrings';

require('./main.scss');

// Importing Vue.js
import Vue from 'vue';

import store from './store';
import router from './router';
// Improting Vue.js SFC
import AutomationFormsSoftwareInstallsComponent from './components/AutomationFormsSoftwareInstalls.vue';

export interface IAutomationFormsSoftwareInstallsWebPartProps {
  description: string;
}

export default class AutomationFormsSoftwareInstallsWebPart extends BaseClientSideWebPart<IAutomationFormsSoftwareInstallsWebPartProps> {

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    router.beforeEach((to, from, next) => {
      if(store.state.maxPage < parseInt(to.name)) {
        next('/1');
      } else {
        next();
      }
    });

    let el = new Vue({
      el: `#${id}`,
      store,
      router,
      render: h => h(AutomationFormsSoftwareInstallsComponent, {
        props: {
          description: this.properties.description
        }
      })
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
