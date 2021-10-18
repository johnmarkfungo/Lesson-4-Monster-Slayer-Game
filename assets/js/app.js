function getRandomDamage(max, min){
  return Math.floor(Math.random() * (max - min)) + min
}

const app = new Vue({
  el: '#game',
  data() {
    return {
      myHealth: 100,
      enemyHealth: 100,
      attackNumber: 0,
      winner: null,
      logMessages: [],
    }
  },
  computed: {
    enemyHealthBar(){
      if (this.enemyHealth < 0){
        return {width: '0%'}
      }
      return {width: this.enemyHealth + '%'}
    },
    myHealthBar(){
      if (this.myHealth < 0){
        return {width: '0%'}
      }
      return {width: this.myHealth + '%'}
    },
    useSpecialAttack(){
      return this.attackNumber % 3 !== 0
    }
  },
  watch:{
    myHealth(value){
      if (value <= 0 && this.enemyHealth <= 0){
        //A draw
        this.winner = 'Draw'
      } else if (value <= 0){
        //playerLost
        this.winner = 'enemy'
      }
    },
    enemyHealth(value){
      if (value <= 0 && this.myHealth <= 0){
        //A draw
        this.winner = 'Draw'
      }else if (value <= 0){
        //enemy Lost
        this.winner = 'me'
      }
    }
  },
  methods: {
    startNewGame(){
      this.myHealth = 100
      this.enemyHealth = 100
      this.winner = null
      this.attackNumber = 0
      this.logMessages = []
    },
    attackEnemy(){
      this.attackNumber++
      const attackDamage = getRandomDamage(12, 5)
      this.enemyHealth -= attackDamage
      this.addLog('Player', 'Attack', attackDamage)
      this.attackMe()
    },
    attackMe(){
      const attackDamage = getRandomDamage(15, 8)
      this.myHealth -= attackDamage
      this.addLog('Enemy', 'Attack', attackDamage)
    },
    specialAttack(){
      this.attackNumber++
      const attackDamage = getRandomDamage(25, 10)
      this.enemyHealth -= attackDamage
      this.addLog('Player', 'Attack', attackDamage)
      this.attackMe()
    },
    healMe(){
      this.attackNumber++
      const healValue = getRandomDamage(20, 8)
      if (this.myHealth + healValue > 100){
        this.myHealth = 100
      }else{
        this.myHealth += healValue
      }
      this.addLog('Player', 'Heals', healValue)
      this.attackMe()
    },
    surrender(){
      this.winner = 'enemy'
    },
    addLog(who, what, value){
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })
    }
  },
})
