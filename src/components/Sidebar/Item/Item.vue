<template>
        <div @click="(e) =>  closeSidebar(e)">
                <RouterLink exact v-if="item.path" :to="item.path" active-class="active__route" class="sidebar--item--inner parent--list flex-row">
                    <div class="flex-row align-center sidebar--row">
                        <svg-icon type="mdi" :path="item.title === 'Categories' ? mdiTelevision : mdiInformationOutline" :size="25"></svg-icon>
                        <span class="route__title">{{item.title}}</span>  
                    </div>
                    <span v-if="amount" class="new__badge badge">{{amount}}</span>
                </RouterLink>
                <div v-else-if="item.nestedList && item.nestedList.length >0" :class="{'active--nestedList': showSubItem}" class="nestedList flex-column">
                    <div @click="() => changeActiveSublist(item.title)" class="sidebar--item--inner nestedList--btn flex-row">
                        <div class="flex-row align-center">
                            <span>{{item.title}}</span> 
                        </div>
                    </div>
                    <ul :class="{'active__details': showSubItem}" class="subItem--details">
                        <li v-for="(subItem, idx) in item.nestedList" class="sidebar--subItem" :key="subItem.title + idx">
                            <RouterLink exact v-if="subItem.path" :to="subItem.path" active-class="active__route" class="sidebar--item--inner flex-row">
                            <span class="route__title">{{subItem.title}}</span>
                            </RouterLink>
                        </li> 
                    </ul>
                </div>
        </div>
</template>

<script>
import { mdiTelevision, mdiInformationOutline } from "@mdi/js";
import { mapActions } from 'vuex';
    export default {
        props: {
            item: Object,
            showSubItem: Boolean,
            changeActiveSublist: Function,
            amount: [Number, String]
        },
        methods:{
            ...mapActions("toggleKeys", ["mutateKeys"]),
            closeSidebar(e) {
                const tagTarget = e.target.tagName;
                if((window.innerWidth || document.documentElement.offsetWidth) < 670){
                    if( tagTarget === "A" || tagTarget === "SPAN" || tagTarget === "I"){
                        this.mutateKeys({key : "openSidebar", val: false});
                    }      
                }
            }
        },
        setup() {
            return {
                mdiTelevision,
                mdiInformationOutline
            }
        }
    }
</script>