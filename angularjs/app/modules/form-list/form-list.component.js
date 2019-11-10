(function(){

    /* This would absolutely need to be in a config 
     * Change the URL to whatever local URL you configure 
     * when you run the API 
     */
    const endpoint = 'http://localhost:8080/api/forms'

    const formListComponent = {
        templateUrl: 'app/modules/form-list/form-list.template.html',
        controller: FormListController,
        controllerAs: 'vm'
    }

    /* I would never really do this. 
     * I'd move this into a separate service and inject it in 
     */
    FormListController.$inject = ['$http']
    function FormListController($http) {
        const vm = this

        vm.error = ''
        vm.forms = []
        
        function hydrate() {
            $http
                .get(endpoint)
                .then(res => {
                    /* Let's pretty up the data because I stored 
                       the form fields JSON as a string for sample 
                       purposes 
                    */
                    if(res.data && res.data.length > 0) {
                        vm.forms = res.data.map(form => {
                            const { name, json } = form
                            const fields = JSON.parse(json)

                            return {
                                name,
                                fields: fields.fields
                            }
                        })

                        console.log(vm.forms)
                    }
                })
                .catch(err => {
                    vm.error = error
                })
        }

        function connect() {
            console.log('connecting')
            hydrate()
        }

        connect()
    }

    angular
        .module('app.form.list')
        .component('formList', formListComponent)

})()