<template>
  <div id="app-automation-forms" class="container">
    <header class="row">
          <div class="col">
              <!-- <img src="../logo.jpg" alt="Kier"> -->
          </div>
      </header>
      <div class="row main-body">
          <div class="col">
              <h1>New Starter Request Form</h1>
              <div class="progress">
                  <div class="progress-bar bg-info" :style="{width: percentCompleted + '%'}">{{percentCompleted > 0 ? percentCompleted + '%' : ''}}</div>
              </div>
              <div v-if="!submitted && !submitting">
                <nav class="nav nav-pills nav-fill nav-justify">
                    <a class="nav-item nav-link" :class="{'active': page === 1}" href="#" @click.prevent="navigate(1)">General</a>
                </nav>
                <transition>
                  <keep-alive>
                    <router-view></router-view>
                  </keep-alive>
                </transition>
              </div>
              <div v-if="submitting">
                Submitting
              </div> 
              <div v-if="submitted">
                <!-- <span><img class="smlIcon" src="../tick.jpg"><p class="successText">Your request has been successfully submitted, you will receive an email containing the ticket reference number shortly.</p></span>
                <br /> -->
                <p><strong>What's Next?</strong></p>
                <p>The new user account will be created and credentials mailed to their manager.</p>
                <p>If requested, access shall be given to network resources and your orders will be processed.</p>
                <p><strong>Thank you for using this service</strong></p>
                <br/><br/><button type="button" class="btn btn-secondary" >Close</button>
              </div>
          </div>
      </div>
  </div>
</template>

<style src="./AutomationFormsSoftwareInstalls.css"></style>
<script src="./AutomationFormsSoftwareInstalls.js"></script>