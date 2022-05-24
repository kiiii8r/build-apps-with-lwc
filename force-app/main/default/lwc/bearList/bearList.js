// 命令型Apex

//import { LightningElement } from 'lwc';
// import ursusResources from '@salesforce/resourceUrl/ursus_park';
// /** BearController.getAllBears() Apex method */
// import getAllBears from '@salesforce/apex/BearController.getAllBears';
// export default class BearList extends LightningElement {
// 	bears;
// 	error;
// 	appResources = {
// 		bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
// 	};
// 	connectedCallback() {
// 		this.loadBears();
// 	}
// 	loadBears() {
// 		getAllBears()
// 			.then(result => {
// 				this.bears = result;
// 			})
// 			.catch(error => {
// 				this.error = error;
// 			});
// 	}
// }

// ワイヤードApex
import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';
export default class BearList extends LightningElement {
	searchTerm = '';
	@wire(searchBears, {searchTerm: '$searchTerm'})
	bears;
	appResources = {
		bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
	};
	handleSearchTermChange(event) {
        // このメソッドのデバウンス：reactive プロパティを更新しない。
		// この関数が300msの遅延時間内に呼び出されている限り。
		// これは、非常に多くのApexメソッド呼び出しを回避するためです。
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.bears.data.length > 0);
	}
}