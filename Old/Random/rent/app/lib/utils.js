'use strict';

A.isActiveRoute = function(name) {
   if(FlowRouter.current().route.name === name) {
       return 'active';
   }
};

Date.prototype.format = function() {
   var month = this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1;
   var day = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();

   return month + '/' + day + '/' +  this.getFullYear();
}; 
