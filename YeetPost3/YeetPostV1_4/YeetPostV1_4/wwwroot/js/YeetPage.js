﻿new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        const defaultForm = Object.freeze({
            terms: false,
        })

        return {
            header: '',
            model: model,
            filteredModel: Object,
            isFiltered: false,
            yeet: '',
            form: Object.assign({}, defaultForm),
            rules: {
                age: [
                    val => val < 10 || `I don't believe you!`,
                ],
                animal: [val => (val || '').length > 0 || 'This field is required'],
                name: [val => (val || '').length > 0 || 'This field is required'],
            },
           
            terms: false,
         
        }
    },

    computed: {
        formIsValid() {
            return (
                this.form.first &&
                this.form.last &&
                this.form.favoriteAnimal &&
                this.form.terms
            )
        },
    },

    methods: {
        resetForm() {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },
        submit() {
            
            this.resetForm()
            var x = $("#header").val()

            if ($("#header").val() === null || $("#yeet").val() === null) {
                return;
            }

            $.ajax({
                type: 'POST',
                url: '/Yeet/pushNewYeet',
                data: {
                    header: $("#header").val(),
                    yeet: $("#yeet").val()
                },
                success: function (data) {
                    this.model = data
                    $('#results').html(data)
                    setTimeout(function () {// wait for 5 secs(2)
                        location.reload(); // then reload the page.(3)
                    }, 5000);
                },
                error: function (data) {
                    console.log('Error, please report to a developer')
                }
            });
            
            //location.reload(true);
        },
        filterBy: function (byWhat) {

            //this.isFiltered = true;
            
            var e = this
            this.resetForm()
            var x = $("#header").val()

            if (byWhat === null) {
                return;
            }


            $.ajax({
                type: 'GET',
                url: '/Yeet/filterBy',
                data: {
                    location: e.model.location,
                    byWhat: byWhat,
                },
                success: function (data) {
                  
                },
                error: function (data) {
                    console.log('Error, please report to a developer')
                }
            }).done(data => {
                this.model = JSON.parse(data);
              
            });

        },

        changeModel: function (data) {

            this.model = data

            var x = this.model
            
        },
       
       
    },
   
   
    

    submitData: function () {

        if (($("#labName").val() === "") || ($("#labDescription").val()) === "") {
            return;
        }





    }

})