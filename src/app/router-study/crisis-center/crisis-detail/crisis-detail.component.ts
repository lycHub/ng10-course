import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from '../../heroes/hero';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../heroes/hero.service';
import {switchMap} from 'rxjs/operators';
import {Crisis} from '../crisis';
import {CrisisService} from '../crisis.service';
import {DialogService} from '../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrisisDetailComponent implements OnInit {
  editName = '';
  crisis: Crisis;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crisisServe: CrisisService,
    private cdr: ChangeDetectorRef,
    private dialogServe: DialogService) { }
  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params => {
      return this.crisisServe.getCrisis(params.get('id'));
    })).subscribe(crisis => {
      // console.log('cc');
      this.crisis = crisis;
      this.editName = crisis.name;
      this.cdr.markForCheck();
    });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.editName = this.crisis.name;
    this.gotoCrises();
  }

  gotoCrises() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate() {
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    return this.dialogServe.confirm('Discard changes?');
  }
}
